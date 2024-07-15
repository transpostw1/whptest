import React, { useState } from "react";

const OTPField: React.FC = () => {
  const [otp, setOTP] = useState("");

  return (
    <div className="">
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="Enter OTP"
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default OTPField;