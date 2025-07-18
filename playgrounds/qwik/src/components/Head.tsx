import { component$ } from '@qwik.dev/core';
import { useDocumentHead, useLocation } from '@qwik.dev/router';

/**
 * Head with title, meta, link and script elements.
 */
export const Head = component$(() => {
  const documentHead = useDocumentHead();
  const location = useLocation();

  return (
    <>
      <title>{`${documentHead.title} | Formisch`}</title>

      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="canonical" href={location.url.href} />
      <link rel="icon" href="/favicon.ico" />

      {documentHead.meta.map((meta) => (
        <meta key={meta.key} {...meta} />
      ))}

      {documentHead.links.map((link) => (
        <link key={link.key} {...link} />
      ))}

      {documentHead.styles.map((style) => (
        <style
          key={style.key}
          {...style.props}
          dangerouslySetInnerHTML={style.style}
        />
      ))}
    </>
  );
});
