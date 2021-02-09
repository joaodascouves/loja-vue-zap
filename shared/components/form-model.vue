<template>
  <div
    class="form-model"
    v-if="model && data"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <div
      class="form-model__section"
      v-for="([section, rows], sindex) in Object.entries(recursiveModel)"
      :key="`section-${sindex}`"
    >
      <div class="form-model__name" v-if="section !== ''">
        {{ section }}
      </div>
      <label
        :class="{
          'form-model__wrapper': true,
          'form-model__wrapper--custom': !!width,
          'form-model__wrapper--inline': isInline(type),
          'form-model__wrapper--inline-single': isInline(type) && Object.keys(values || {}).length < 2
        }"
        v-for="([
          row,
          {
            label,
            icon,
            color,
            borderColor,
            placeholder,
            hint,
            type,
            values,
            required,
            readonly,
            mask,
            information,
            width,
            mobileWidth,
          }
        ],
        rindex) in Object.entries(rows).filter(k => k[1])"
        :style="`--width: ${width || '100%'}; --mobile-width: ${mobileWidth || (width || '100%')};`"
        :key="`row-${row}-${rindex}`"
      >
        <div
          v-if="
            label !== undefined &&
              !['text', 'number', 'password'].includes(type)
          "
          :class="{
            'form-model__label': true,
            'form-model__label--optional': !(required || readonly)
          }"
        >
          {{ label }}
        </div>
        <input-text
          :class="{
            'form-model__input': true,
            'form-model__input--text': true
          }"
          v-if="['text', 'number', 'password'].includes(type)"
          :name="row"
          :type="type"
          :label="label"
          :icon="icon"
          :color="color"
          :borderColor="borderColor"
          :placeholder="placeholder"
          :hint="hint"
          :mask="mask && typeof mask === 'object' ? mask : { mask }"
          :optional="!required"
          v-model="recursiveData[row]"
          :disabled="readonly"
        />
        <label
          class="form-model__inline"
          v-else-if="isInline(type)"
          v-for="([value, valueLabel], vindex) in Object.entries(values || {})"
          :key="`value-${row}-${vindex}`"
        >
          <input
            class="form-model__input form-model__input--inline"
            :name="row"
            :type="type"
            :value="value"
            v-model="recursiveData[row]"
          />
          <div>{{ valueLabel }}</div>
        </label>
        <select
          class="form-model__select"
          v-else-if="['select'].includes(type)"
          v-model="recursiveData[row]"
          :name="row"
        >
          <option
            class="form-model__option"
            v-for="([value, valueLabel], vindex) in Object.entries(
              values || {}
            )"
            :key="`value-${row}-${vindex}`"
            :value="value"
          >
            {{ valueLabel }}
          </option>
        </select>
        <textarea
          class="form-model__textarea"
          v-else-if="type === 'textarea'"
          v-model="recursiveData[row]"
          :name="row"
        ></textarea>

        <small class="form-model__information">
          {{ information }}
        </small>
      </label>

      <slot></slot>
      <div class="form-model__dummy"></div>
    </div>
  </div>
</template>

<script>
import { flattenObject, deflattenObject } from 'shared/helpers';

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputs: [],
      recursiveData: {},
    };
  },
  mounted() {
    this.recursiveData = flattenObject({ ...this.data });

    const rows = Object.values(this.recursiveModel);

    // set defaults
    Object.values(rows).forEach((row) => Object.entries(row).forEach(([name, object]) => {
      if (object._default && !this.recursiveData[name]) {
        const input = this.$el.querySelector(`[value="${object._default}"]`);

        if (input) {
          switch (input.tagName) {
          case 'INPUT':
            input.checked = true;
            break;
          case 'OPTION':
            input.selected = true;
            break;
          default:
            break;
          }
        }
      }
    }));
  },
  computed: {
    recursiveModel() {
      return Object.entries(this.model)
        .map(([key, value]) => ({
          [key]: flattenObject(value),
        }))
        .reduce(
          (a, c) => ({
            ...a,
            ...c,
          }),
          {},
        );
    },
  },
  methods: {
    isInline(type) {
      return ['radio', 'checkbox'].includes(type);
    },
  },
  watch: {
    data: {
      deep: true,
      immediate: false,
      handler(data) {
        const object = { ...this.recursiveData };

        if (Object.keys(object).length === 0) {
          this.recursiveData = flattenObject({ ...data });
        }
      },
    },
    recursiveData: {
      deep: true,
      immediate: false,
      handler(event) {
        const data = deflattenObject({ ...event });

        Object.entries(data).forEach(([key, value]) => {
          this.data[key] = value;
        });
      },
    },
  },
};
</script>

<style scoped src="./form-model.css"></style>
