import { NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";

const calculateHash = (
  clientCode: string,
  requestId: string,
  apiKey: string,
  salt: string
): string => {
  const data = `${clientCode}|${requestId}|${apiKey}|${salt}`;
  return crypto.createHash("sha256").update(data).digest("hex");
};

const generateRandomHex = (length: number): string =>
  Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

export async function POST(req: Request) {
  const body = await req.json();

  const { pan_number, name, dob, userEmail } = body;

  const clientCode = process.env.NEXT_PUBLIC_CLIENT_CODE!;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const subClientCode = process.env.NEXT_PUBLIC_SUBCLIENT!;
  const salt = process.env.NEXT_PUBLIC_SALT!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const stan = generateRandomHex(16);
  const requestId = generateRandomHex(32);
  const transmissionDatetime = Math.floor(Date.now() / 1000).toString();

  const hash = calculateHash(clientCode, requestId, apiKey, salt);

  const payload = {
    headers: {
      client_code: clientCode,
      sub_client_code: subClientCode,
      channel_code: "WEB",
      channel_version: "1",
      stan,
      client_ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      transmission_datetime: transmissionDatetime,
      operation_mode: "SELF",
      run_mode: "TEST",
      actor_type: "TEST",
      user_handle_type: "EMAIL",
      user_handle_value: "rameezebrahim@transpost.co",
      location: "NA",
      function_code: "VERIFY_PAN",
      function_sub_code: "NUMBER",
      api_key: apiKey,
      hash,
    },
    request: {
      pan_details: {
        pan_number,
        name,
        // dob,
      },
      request_id: requestId,
    },
  };

  try {
    const response = await axios.post(baseUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "An error occurred while verifying PAN" },
      { status: 500 }
    );
  }
}
