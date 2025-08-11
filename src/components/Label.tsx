interface Props {
  text: string;
  isRequired?: boolean;
}

const Label = ({ text, isRequired = false }: Props) => {
  return (
    <label className="block text-sm font-semibold text-gray-700">
      {text}
      {/* {isRequired && <span className="required-label">必須</span>} */}
      {isRequired &&
        <span className="ml-2 inline-flex items-center rounded bg-orange-500/70 px-2 py-0.5 text-xs font-bold text-white">
          必須
        </span>
      }
    </label>
  )
}

export default Label;
