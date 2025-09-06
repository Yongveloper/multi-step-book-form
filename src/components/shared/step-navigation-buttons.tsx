import Button from './button';

interface IStepNavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  prevText: string;
  nextText: string;
  showNext: boolean;
  showPrev: boolean;
}

function StepNavigationButtons({
  onNext = () => {},
  onPrev = () => {},
  prevText = '이전 단계',
  nextText = '다음 단계',
  showNext = true,
  showPrev = true,
}: Partial<IStepNavigationButtonsProps>) {
  return (
    <Button.Group>
      {showPrev && (
        <Button type="button" onClick={onPrev} variant="secondary">
          {prevText}
        </Button>
      )}
      {showNext && (
        <Button type="button" onClick={onNext}>
          {nextText}
        </Button>
      )}
    </Button.Group>
  );
}

export default StepNavigationButtons;
