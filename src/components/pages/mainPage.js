import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, message, Typography, Tooltip } from "antd";
import { getBookListWithStatus, postRentalEnd, postRentalStart } from "../../apis";
import styled from "styled-components";
const { Text } = Typography;

const START_RENTAL = "START_RENTAL";
const END_RENTAL = "END_RENTAL";
const ADDED_BOOK = "ADDED_BOOK";
const UPDATED_BOOK = "UPDATED_BOOK";
const DELETED_BOOK = "DELETED_BOOK";

const shouldBookListUpdate = (type) => {
  if (
    type === START_RENTAL ||
    type === END_RENTAL ||
    type === ADDED_BOOK ||
    type === UPDATED_BOOK ||
    type === DELETED_BOOK
  ) {
    return true;
  } else {
    return false;
  }
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const BooklistWrapper = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;

  & > li {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: stretch;
    border-bottom: 1px solid var(--primary-boder-color);

    .book-item {
      display: flex;
      align-items: center;
      justify-content: center;

      &.book-item-header {
        border-top: 1px solid var(--primary-boder-color);
      }

      &.book-item-image {
        height: 230px;
        background: #f6f6f6;
        padding: 8px;
        img {
          /* width: 200px; */
          /* height: 200px; */
          display: block;
          max-width: 130px;
          max-height: 230px;
          width: auto;
          height: auto;
        }
      }

      &.book-item-status {
        font-weight: bold;
      }

      &.book-item-author {
        flex-direction: column;
      }

      border-right: 1px solid var(--primary-boder-color);
    }
  }
`;

const setDateFormat = (isoDateString) => {
  return new Date(isoDateString).toLocaleString("ko-kr", { timeZone: "UTC" });
};

const renderAuthors = (authors) => {
  let authorsElement = [];
  for (let i = 0; i < authors.length; i++) {
    const element = authors[i];

    if (i > 4) {
      authorsElement.push(<span key={element}>외 {authors.length - i}명</span>);
      break;
    } else {
      authorsElement.push(<span key={element}>{element}</span>);
    }
  }

  return authorsElement;
};

const MainPage = ({ serverEvent, socket }) => {
  const [bookList, setBookList] = useState(new Map());
  const refBookList = useRef(new Map());

  console.log("Mainpage rendered", socket);

  const renderBookListHeader = useCallback(() => {
    return (
      <li>
        <div className="book-item book-item-header">이미지</div>
        <div className="book-item book-item-header book-item-name">이름</div>
        <div className="book-item book-item-header book-item-author">저자</div>
        <div className="book-item book-item-header">대여상태</div>
        <div className="book-item book-item-header">ㄴㄴ</div>
        <div className="book-item book-item-header">빌린사람</div>
      </li>
    );
  }, []);

  const renderBookList = useCallback(() => {
    const elements = [];

    for (const [, book] of bookList) {
      const bookElement = (
        <li key={book.bookId}>
          <div className="book-item book-item-image">
            <img alt={`${book.name} 이미지`} src={book.image} />
          </div>
          <div className="book-item book-item-name">{book.name}</div>
          <div className="book-item book-item-author">
            {/* {book.authors.map((author) => (
          <span key={author}>{author}</span>
        ))} */}
            {renderAuthors(book.authors)}
          </div>
          <div className="book-item book-item-status">
            {book.status === "대여중" ? (
              <Tooltip title={setDateFormat(book.start)}>
                <Text type="danger">{book.status}</Text>
              </Tooltip>
            ) : (
              <Text type="success">{"대여가능"}</Text>
            )}
          </div>
          <div className="book-item">
            {book.status === "대여중" ? (
              <Button onClick={() => postRentalEnd({ bookId: book.bookId, userId: 2 })}>
                대여종료
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() =>
                  postRentalStart({ bookId: book.bookId, userId: 2 }).then((data) =>
                    console.log(data)
                  )
                }
              >
                대여하기
              </Button>
            )}
          </div>
          <div className="book-item">{book.userId || ""}</div>
        </li>
      );
      elements.push(bookElement);
    }

    return elements;
  }, [bookList]);

  const fetchBookList = useCallback(async ({ offset, limit }) => {
    const res = await getBookListWithStatus({ offset, limit });
    console.log("_fetchBookList", res);

    const _bookList = new Map();
    res.forEach((book) => {
      _bookList.set(book.bookId, book);
    });
    setBookList(_bookList);
    return res;
  }, []);

  useEffect(() => {
    fetchBookList({ offset: 0, limit: 20 });
  }, [fetchBookList]);

  useEffect(() => {
    refBookList.current = bookList;
  }, [bookList]);

  useEffect(() => {
    console.log("serverEvent is changed", serverEvent);
    if (!serverEvent) return;

    const { type, data } = serverEvent;

    if (shouldBookListUpdate(type)) {
      const bookInfo = refBookList.current.get(data.bookId);
      if (type === START_RENTAL) {
        setBookList((prev) =>
          new Map(prev).set(data.bookId, { ...bookInfo, start: data.start, status: "대여중" })
        );
        message.success(`${bookInfo.name}의 대여가 시작되었습니다.`);
      } else if (type === END_RENTAL) {
        setBookList((prev) =>
          new Map(prev).set(data.bookId, { ...bookInfo, start: null, status: null })
        );
        message.success(`${bookInfo.name}의 대여가 종료되었습니다.`);
      }
    }
  }, [serverEvent, fetchBookList]);

  return (
    <Wrapper>
      <BooklistWrapper>
        {renderBookListHeader()}
        {bookList && renderBookList()}
      </BooklistWrapper>
    </Wrapper>
  );
};

export default MainPage;
