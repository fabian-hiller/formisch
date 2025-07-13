import { Title as SolidTitle } from '@solidjs/meta';

type TitleProps = {
  children: string;
};

/**
 * Title of the page that is displayed in the browser tab, for example.
 */
export function Title(props: TitleProps) {
  return <SolidTitle>{`${props.children} | Formisch`}</SolidTitle>;
}
