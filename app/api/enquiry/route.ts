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
    const state = typeof body?.state === "string" ? body.state.trim() : "";
    const program = typeof body?.program === "string" ? body.program.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const url = typeof body?.url === "string" ? body.url.trim() : "";
    const source = typeof body?.source === "string" ? body.source.trim() : "";
    const campaign = typeof body?.campaign === "string" ? body.campaign.trim() : "";
    const university = typeof body?.university === "string" ? body.university.trim() : "";

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "name, email, phone are required" }, { status: 400 });
    }

    // ✅ Phone validation: exactly 10 digits
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit phone number." }, { status: 400 });
    }

    const doc = {
      name,
      email: email.toLowerCase(),
      phone,
      state: state || null,
      program: program || null,
      message: message || null,
      source: source || url || "Ignouonline",
      campaign: campaign || null,
      university: university || null,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db(dbName);
    const result = await db.collection(collectionName).insertOne(doc);

    const apiEndpoint = process.env.API_ENDPOINT;
    // NeoDove / Neodove Custom Integration: keys must be "name", "mobile", "email" (mobile mandatory).
    // Pehle hum "phone" bhej rahe the — CRM lead create nahi karti thi.
    const crmPayload: Record<string, string | null> = {
      name,
      mobile: cleanPhone,
      email: email.toLowerCase(),
      State: state || "",
      program: program || null,
      message: message || null,
      source: source || url || "Ignouonline",
      campaign: campaign || null,
      university: university || null,
    };
    Object.keys(crmPayload).forEach((k) => {
      if (crmPayload[k] === null || crmPayload[k] === "") delete crmPayload[k];
    });

    // CRM ko await: lead DB ke baad CRM tak pakka pahunche; fail par user ko error (retry kar sake)
    if (apiEndpoint) {
      try {
        const crmResponse = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(crmPayload),
        });
        if (!crmResponse.ok) {
          const errText = await crmResponse.text();
          let errorData: unknown = errText;
          try {
            errorData = JSON.parse(errText);
          } catch {
            /* plain text e.g. error message */
          }
          console.error("CRM API Error:", {
            status: crmResponse.status,
            statusText: crmResponse.statusText,
            errorData,
          });
          return NextResponse.json(
            { error: "Failed to send data to CRM. Please try again later." },
            { status: 502 }
          );
        }
      } catch (crmErr) {
        console.error("Failed to send lead to CRM:", crmErr);
        return NextResponse.json(
          { error: "Failed to send data to CRM. Please try again later." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
