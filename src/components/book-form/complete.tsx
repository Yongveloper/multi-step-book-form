import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import Button from '~/components/shared/button';
import { useStepNavigation } from '~/hooks/use-step-navigation';
import { BookFormData } from '~/schemas/book-form.schema';

export default function Complete() {
  const { reset } = useFormContext<BookFormData>();
  const { goToStep } = useStepNavigation();

  const handleStartOver = () => {
    reset();
    goToStep(1);
  };

  return (
    <Container>
      <CompletionCard>
        <Icon>🎉</Icon>
        <Title>도서 리뷰 작성 완료!</Title>
        <Description>
          모든 단계를 완료했습니다.
          <br />
          작성하신 도서 리뷰가 성공적으로 저장되었습니다.
        </Description>

        <Button onClick={handleStartOver}>새로운 리뷰 작성하기</Button>
      </CompletionCard>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const CompletionCard = styled.div`
  text-align: center;
  padding: 40px 32px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  max-width: 400px;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 32px 0;
`;
