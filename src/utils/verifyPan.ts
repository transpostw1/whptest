import axios from "axios";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

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

interface PANDetails {
  pan_number: string;
  name: string;
  dob: string;
}

interface VerifyUserIdDocRequest {
  headers: {
    client_code: string;
    sub_client_code: string;
    channel_code: string;
    channel_version: string;
    stan: string;
    client_ip: string | undefined;
    transmission_datetime: string;
    operation_mode: string;
    run_mode: string;
    actor_type: string;
    user_handle_type: string;
    user_handle_value: string;
    location: string;
    function_code: string;
    function_sub_code: string;
    api_key: string;
    hash: string;
  };
  request: {
    pan_details: PANDetails;
    request_id: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { pan_number, name, dob, userEmail }: PANDetails & { userEmail: string } = req.body;

  const clientCode = process.env.NEXT_PUBLIC_CLIENT_CODE!;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const subClientCode = process.env.NEXT_NEXT_PUBLIC_SUBCLIENT!;
  const salt = process.env.NEXT_PUBLIC_SALT!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  


  const stan = generateRandomHex(16);
  const requestId = generateRandomHex(32);
  const transmissionDatetime = Math.floor(Date.now() / 1000).toString();

  const hash = calculateHash(clientCode, requestId, apiKey, salt);

  const body: VerifyUserIdDocRequest = {
    headers: {
      client_code: clientCode,
      sub_client_code: subClientCode,
      channel_code: "WEB",
      channel_version: "1",
      stan,
      client_ip: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress,
      transmission_datetime: transmissionDatetime,
      operation_mode: "SELF",
      run_mode: "TEST",
      actor_type: "TEST",
      user_handle_type: "EMAIL",
      user_handle_value: userEmail,
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
        dob,
      },
      request_id: requestId,
    },
  };

  try {
    const response = await axios.post(baseUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      error: error.response?.data || "An error occurred while verifying PAN",
    });
  }
}
