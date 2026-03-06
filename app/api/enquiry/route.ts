import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    if (!clientPromise) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }
    const dbName = process.env.MONGODB_DB || "ignou_online";
    const collectionName = process.env.MONGODB_COLLECTION || "leads";
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const program = typeof body?.program === "string" ? body.program.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const url = typeof body?.url === "string" ? body.url.trim() : "";

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "name, email, phone are required" }, { status: 400 });
    }

    // ✅ Phone validation: exactly 10 digits
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit phone number." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const doc = {
      name,
      email: email.toLowerCase(),
      phone,
      program: program || null,
      message: message || null,
      url: url || null,
      source: "Ignouonline",
      createdAt: new Date(),
    };
    const result = await db.collection(collectionName).insertOne(doc);

    //  lead send to crm
    const apiEndpoint = process.env.API_ENDPOINT;
    if (apiEndpoint) {
      try {
        const crmResponse = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email: email.toLowerCase(),
            phone,
            program: program || null,
            message: message || null,
            url: url || null,
            source: "Ignouonline",
          }),
        });

        if (!crmResponse.ok) {
          const errorData = await crmResponse.json().catch(() => null);
          console.error("CRM API Error:", {
            status: crmResponse.status,
            statusText: crmResponse.statusText,
            errorData,
          });
        }
      } catch (crmErr) {
        console.error("Failed to send lead to CRM:", crmErr);
        
      }
    }

    return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";