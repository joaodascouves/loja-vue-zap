<template>
  <div
    :class="`input ${computedStyles}`"
    :style="
      `
            --color: ${color};
            --border-color: ${borderColor};
        `
    "
  >
    <div class="input__wrapper">
      <div class="input__label" v-if="label">
        <span>{{ label }}</span>
        <span v-if="optional"> (opcional)</span>
      </div>
      <div class="input__rectangle">
        <input
          :class="{
            input__rectangle__input: true,
            'input__rectangle__input--padded': !!icon
          }"
          :name="name"
          :type="type"
          :value="value || (type === 'number' ? 0 : '')"
          :placeholder="placeholder"

          v-on="$listeners"
          v-mask="mask"
          :spellcheck="spellcheck"

          ref="input"
        />
        <i :class="`input__rectangle__icon ${icon}`" v-if="icon" />
      </div>

      <div class="input__border" />
    </div>

    <div class="input__hint" v-if="hint">{{ hint }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text,',
    },
    value: {
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: 'inherit',
    },
    borderColor: {
      type: String,
      default: 'var(--foreground-color-1)',
    },
    icon: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      required: false,
    },
    mask: {
      type: Object,
      required: false,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    spellcheck: {
      type: Boolean,
      default: false,
    },
    istyle: {
      type: String,
      default: 'default',
    },
    lazy: {
      type: Boolean,
      default: true,
    }
  },
  model: {
    prop: 'value',
    event: 'update',
  },
  computed: {
    computedStyles() {
      let style = this.istyle;
      if (style === 'default') {
        style = this.$root.$c_inputStyle || style;
      }

      return style
        .split(' ')
        .map((name) => `input--${name}`)
        .join(' ');
    },
  },
  mounted() {
    this.$refs.input.addEventListener(this.lazy ? 'change' : 'input', (event) => {
      this.updateModel(event);
    });
  },
  methods: {
    updateModel(event) {
      const {
        target: { type, value },
      } = event;

      this.$emit('update', type === 'password' ? value : value.trim());
    },
  },
};
</script>

<style scoped src="./base.css"></style>
<style scoped src="./styles.css"></style>
