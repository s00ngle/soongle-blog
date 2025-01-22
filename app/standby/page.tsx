"use client";

import { useState } from "react";

const StandByPage = () => {
  const [nickname, setNickname] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "employer" | "jobseeker" | null
  >(null);

  const handleNicknameCheck = () => {
    if (nickname === "김싸피") {
      setIsNicknameValid(false);
      setValidationMessage("이미 사용중인 닉네임입니다.");
    } else if (nickname === "") {
      setIsNicknameValid(false);
      setValidationMessage("닉네임을 입력해주세요.");
    } else {
      setIsNicknameValid(true);
      setValidationMessage("사용 가능한 닉네임입니다.");
    }
  };

  return (
    <div className="flex flex-col items-center w-[390px] h-[844px] overflow-hidden gap-28 bg-white border border-black">
      <header className="w-full px-10 pt-20">
        <h1 className="text-[40px] font-bold text-black">스탠바이</h1>
      </header>

      <main className="w-full px-5">
        <section className="flex flex-col gap-2">
          <label className="text-base font-bold text-black" htmlFor="nickname">
            닉네임
          </label>
          <div className="flex items-center gap-4">
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="입력하세요"
              className="flex-grow h-[50px] px-4 text-base font-bold text-gray-600 placeholder-gray-400 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <button
              onClick={handleNicknameCheck}
              className="h-[50px] px-6 text-base font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-all duration-200 whitespace-nowrap"
            >
              중복확인
            </button>
          </div>
          {validationMessage && (
            <p
              className={`text-base font-bold ${
                isNicknameValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {validationMessage}
            </p>
          )}
        </section>
      </main>

      <footer className="flex flex-col items-center gap-[30px]">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedRole("employer")}
            className={`w-[160px] h-[50px] text-base font-bold rounded-lg transition-all duration-200 ${
              selectedRole === "employer"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"
            }`}
          >
            구인자
          </button>
          <button
            onClick={() => setSelectedRole("jobseeker")}
            className={`w-[160px] h-[50px] text-base font-bold rounded-lg transition-all duration-200 ${
              selectedRole === "jobseeker"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"
            }`}
          >
            구직자
          </button>
        </div>
        <button className="w-[330px] h-[50px] text-base font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-all duration-200">
          회원가입
        </button>
      </footer>
    </div>
  );
};

export default StandByPage;
