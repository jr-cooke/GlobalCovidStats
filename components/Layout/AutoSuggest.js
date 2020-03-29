import styled, { keyframes } from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import {
  toggleButtonColor,
  textColor,
  backgroundColor,
  autoSuggestBorder
} from "../../theme";

export default function AutoSuggest({ countries }) {
  const inputRef = useRef();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedCountries, setSearchedCountries] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = countries.filter(c => {
        return c.country.toLowerCase().includes(search.toLowerCase());
      });
      console.log("object", filtered);
      setSearchedCountries(filtered);
    } else {
      setSearchedCountries([]);
    }
  }, [search]);

  return (
    <>
      <CountrySearch showSearch={showSearch}>
        <FiSearch
          onClick={() => {
            setShowSearch(!showSearch);
            if (showSearch) {
              setSearch("");
            } else {
              setTimeout(
                () => {
                  inputRef.current.click();
                  inputRef.current.focus();
                },
                300
              );
            }
          }}
        />
        <input
          type="text"
          ref={inputRef}
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
          onKeyDown={e => {
            if(search.length === 0 && e.keyCode === 8) {
              setShowSearch(false);
            }
          }}
        />
      </CountrySearch>
      {searchedCountries.length > 0 && (
        <SearchedCountries>
          {searchedCountries.map(sC => (
            <Link
              key={sC.country}
              href="/country/[country]"
              as={`/country/${sC.country}`}
            >
              <Country>
                {sC.flag ? (
                  <Img src={sC.flag} />
                ) : (
                  <Img mock src="/mockflag.png" />
                )}
                <Name>{sC.country}</Name>
              </Country>
            </Link>
          ))}
        </SearchedCountries>
      )}
    </>
  );
}

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CountrySearch = styled.div`
  display: flex;
  color: ${toggleButtonColor};
  border: 1px solid ${toggleButtonColor};
  width: ${({ showSearch }) => (showSearch ? "50%" : "20px")};
  transition: 0.5s ease;
  max-width: 50%;
  border-radius: 10px;
  padding: 2px 10px;
  height: 26px;
  svg {
    font-size: 20px;
    margin-top: 2px;
    &:hover {
      cursor: pointer;
    }
  }
  input[type="text"] {
    -webkit-appearance: none;
    background: transparent;
    display: ${({ showSearch }) => (showSearch ? "block" : "none")};
    transition: 0.3s ease;
    font-size: 16px;
    border: none;
    color: ${textColor};
    width: calc(100% - 20px);
    margin-left: 7px;
    &:active {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
`;

const SearchedCountries = styled.div`
  background: ${backgroundColor};
  width: calc(50% + 5px);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid ${toggleButtonColor};
  max-height: 300px;
  overflow: scroll;
  animation: ${fadeIn} 0.2s linear;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Img = styled.img`
  width: 32px;
  height: ${props => props.mock ? '20px' : '32px'};
  margin-right: 10px;
`;

const Name = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Country = styled.a`
  display: flex;
  align-items: center;
  min-height: 40px;
  border-bottom: 1px solid ${autoSuggestBorder};
  padding-left: 10px;
`;