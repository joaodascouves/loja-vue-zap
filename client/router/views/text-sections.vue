<template>
  <div class="padded">
    <div class="content whitespace-preline easy-text" ref="content" />
  </div>
</template>

<script>
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';

import { headTag } from 'shared/utils';

export default {
  mounted() {
    const { textSections } = this.$store.getters['client/business'];
    const rel = new Map([
      ['/about', 'aboutUs'],
      ['/terms-of-use', 'termsOfUse'],
    ]);

    const text = textSections[rel.get(this.$route.path)];
    const plainText = marked(text, { renderer: new PlainTextRenderer() })
      .replace(/[\n\t\s]/gms, ' ')
      .replace(/ {2,}/gms, '; ')
      .trim();

    const trimmedText = plainText.length >= 160 ? `${plainText.substr(0, 157)}...` : plainText;

    this.$refs.content.innerHTML = marked(text);

    headTag('meta[name=description]', 'content', trimmedText);
  },
};
</script>
