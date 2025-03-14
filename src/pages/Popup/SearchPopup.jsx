import React, { useState } from "react";
import "./SearchPopup.css"; // 스타일 적용

const SearchPopup = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // 빈 입력 방지
    setLoading(true);

    try {
      const response = await fetch(
        `https://stdict.korean.go.kr/api/search.do?key=714604C8E02994906103C78E5E65B254&q=${query}&req_type=json`
      );
      const data = await response.json();

      if (data.channel && data.channel.item) {
        setResults(data.channel.item);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-popup">
      <input
        type="text"
        placeholder="검색어 입력"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {loading && <p>검색 중...</p>}

      <div className="search-result">
        {results.length > 0 ? (
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>{item.word}</strong>: {item.sense.definition}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
