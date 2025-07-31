import styled from '@emotion/styled';

import Button from '../shared/button';
import Input from '../shared/input';

interface IBookQuotesProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function BookQuotes({ onNext, onPrev }: IBookQuotesProps) {
  return (
    <div>
      <h2>4단계 - 인용구</h2>

      <Container>
        <Top>
          <h3>인용구 #1</h3>
          <Button>삭제</Button>
        </Top>

        <div>
          <h4>인용구 내용</h4>
          <Textarea placeholder="인용구를 입력하세요." />
        </div>

        <div>
          <h4>페이지 번호</h4>
          <Input type="number" style={{ width: 100 }} />
        </div>
      </Container>

      <Button.Group>
        <Button type="button" onClick={onPrev} variant="secondary">
          이전 단계
        </Button>
        <Button type="button" onClick={onNext}>
          다음 단계
        </Button>
      </Button.Group>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #efefef;
  border-radius: 8px;
  gap: 16px;
  margin-bottom: 16px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  button {
    background-color: #ff2b41;
    width: 80px;
    flex: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid black;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;

  &[aria-invalid='true'] {
    border-color: red;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
