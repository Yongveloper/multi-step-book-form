import { useFieldArray } from 'react-hook-form';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { FORM_FIELDS } from '~/constants/book-form.constant';

import Button from '../shared/button';
import Input from '../shared/input';

interface IBookQuotesProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function BookQuotes({ onNext, onPrev }: IBookQuotesProps) {
  const { fields, append, remove } = useFieldArray({
    name: FORM_FIELDS.QUOTES,
  });

  const handleAddQuote = () => {
    append({ content: '', page: null });
  };

  const handleRemoveQuote = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <h2>4단계 - 인용구</h2>
      <Container>
        {fields.map((field, index) => (
          <Card key={field.id}>
            <Top>
              <h3>인용구 #{index + 1}</h3>
              {fields.length > 1 && (
                <Button type="button" onClick={() => handleRemoveQuote(index)}>
                  삭제
                </Button>
              )}
            </Top>

            <div>
              <h4>
                인용구 내용 <Required>*</Required>
              </h4>
              <Input.RHFTextarea
                name={`${FORM_FIELDS.QUOTES}.${index}.content`}
                placeholder="인용구를 입력하세요."
              />
              <Input.RHFDescription
                name={`${FORM_FIELDS.QUOTES}.${index}.content`}
              />
            </div>

            {fields.length > 1 && (
              <div>
                <h4>
                  페이지 번호 <Required>*</Required>
                </h4>
                <Input.RHFInput
                  name={`${FORM_FIELDS.QUOTES}.${index}.page`}
                  type="number"
                  style={{ width: 100 }}
                />
                <Input.RHFDescription
                  name={`${FORM_FIELDS.QUOTES}.${index}.page`}
                />
              </div>
            )}
          </Card>
        ))}
      </Container>

      <AddQuoteButton onClick={handleAddQuote}>+ 인용구 추가</AddQuoteButton>

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
  max-height: 500px;
  overflow-y: auto;
  padding: 0 16px;
`;

const Card = styled.div`
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

const AddQuoteButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  background-color: #dfebf7;
  color: #007bff;
  margin-bottom: 16px;
  border: 2px dashed #007bff;
`;

const Required = styled.span`
  color: red;
`;
