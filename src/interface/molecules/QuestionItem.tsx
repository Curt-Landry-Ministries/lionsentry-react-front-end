import Label from "../atoms/Label";
import Subtitle from "../atoms/Subtitle";
import TextInput from "../atoms/MultiLineTextInput";
interface QuestionItemProps {
  title: string;
  subtitle: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ title, subtitle }) => (
  <div>
    <Label>{title}</Label>
    <Subtitle>{subtitle}</Subtitle>
    <TextInput />
  </div>
);

export default QuestionItem;
