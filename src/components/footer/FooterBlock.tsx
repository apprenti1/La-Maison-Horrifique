import { Link } from "@/components/core/Link";


type FooterBlockProps = {
  block: { title: string; path: string }[];
};

export function FooterBlock({ block }: FooterBlockProps) {
  return (
    <div className="flex flex-col space-y-4">
      <h4 className="text-lg font-semibold text-white mb-4">{block[0].title}</h4>
      <ul className="space-y-2 text-sm text-gray-400">
        {block.map((item, index) => (
          <li key={index}>
            <Link path={item.path} text={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}