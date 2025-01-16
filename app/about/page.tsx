import { Metadata } from "next";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <div className="flex-grow flex flex-col items-center py-6 bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
        About Me
      </h1>
      <p className="mt-4 text-center text-gray-700 max-w-2xl">
        Hello! I'm Soongle, a frontend developer passionate about technology.
        This blog is a space where I share my learning and experiences.
      </p>

      {/* Social Media Buttons */}
      <div className="mt-8 flex space-x-8">
        <a
          href="https://www.youtube.com/@soongle"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-red-600 text-white rounded-full shadow-xl transform hover:scale-110 transition-transform"
        >
          <FaYoutube className="text-3xl" />
        </a>
        <a
          href="https://www.instagram.com/kyso_on/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-xl transform hover:scale-110 transition-transform"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://github.com/s00ngle"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-gray-800 text-white rounded-full shadow-xl transform hover:scale-110 transition-transform"
        >
          <FaGithub className="text-3xl" />
        </a>
      </div>

      {/* Activity Table */}
      <section className="mt-8 w-full max-w-4xl px-3">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Activities
        </h2>
        <table className="mt-4 w-full text-left table-auto shadow-lg rounded-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Activity
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Details
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">SSAFY</td>
              <td className="px-4 py-4">12기 Coding Track</td>
              <td className="px-4 py-4">2024.07 - 2025.06</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">GDSC HUFS</td>
              <td className="px-4 py-4">
                4기 Member <br /> 5기 Core Member
              </td>
              <td className="px-4 py-4">2022.09 - 2024.08</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">HUFS Code Festival</td>
              <td className="px-4 py-4">문제 출제 및 검수 총괄</td>
              <td className="px-4 py-4">2022, 2023</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">UMC</td>
              <td className="px-4 py-4">4기 Web 파트</td>
              <td className="px-4 py-4">2023.03 - 2023.08</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">한국외대 SW 봉사단</td>
              <td className="px-4 py-4">23년도 부회장</td>
              <td className="px-4 py-4">2022.03 - 2023.12</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">
                덕영고등학교 프로그래밍 강사
              </td>
              <td className="px-4 py-4">C, Python 강의</td>
              <td className="px-4 py-4">2022.05 - 2023.01</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">
                한국외대 고급문제해결기법 강의
              </td>
              <td className="px-4 py-4">채점 조교 및 강의 진행</td>
              <td className="px-4 py-4">2022.03 - 2022.06</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">
                한민고등학교 코딩캠프 강사
              </td>
              <td className="px-4 py-4">자료구조, 알고리즘 강의</td>
              <td className="px-4 py-4">2018, 2019</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Award Table */}
      <section className="mt-8 w-full max-w-4xl px-3">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Awards
        </h2>
        <table className="mt-4 w-full text-left table-auto shadow-lg rounded-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Competition
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Award
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">DSC HUFS Code Festival</td>
              <td className="px-4 py-4">은상</td>
              <td className="px-4 py-4">2019.11.21</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">ICT 어워드 코리아</td>
              <td className="px-4 py-4">알고리즘 부문 장려상</td>
              <td className="px-4 py-4">2017.07.20</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">정보 올림피아드</td>
              <td className="px-4 py-4">경기도 지역 장려상</td>
              <td className="px-4 py-4">2017.04.24</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">
                한민고등학교 정보과학 문제 해결 대회
              </td>
              <td className="px-4 py-4">코딩부문 최우수상</td>
              <td className="px-4 py-4">2016.06.17</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">RoboCup Korea Open</td>
              <td className="px-4 py-4">Best Research Award</td>
              <td className="px-4 py-4">2016.02.27</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium">
                한민고등학교 정보 활용대회
              </td>
              <td className="px-4 py-4">실용 SW 개발 부문 은상</td>
              <td className="px-4 py-4">2015.12.30</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AboutPage;
