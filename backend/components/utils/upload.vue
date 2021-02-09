<template>
  <div class="upload-container">
    <label>
      <div class="upload">
        <img class="upload__image-preview" :src="current" />
        <input
          class="upload__input"
          type="file"
          accept="image/*"
          @change="updateFile"
        />
        <input-text
          name="link"
          type="text"
          v-model="link"
          placeholder="ou cole diretamente o link"
          icon="fa fa-link"

          @change="updateFile"
          :lazy="false"
        />
      </div>
    </label>
    <div class="options clickable" :class="{ 'options--hidden': !current }">
      <span @click="expandImage">Expandir</span>
      <span @click="removeImage">Remover</span>
    </div>
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression';
import store from 'backend/store';

export default {
  props: {
    current: {
      type: String,
      required: false,
    },
    maxSizeMB: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      file: {},
      link: '',
    };
  },
  computed: {
    isFile() {
      return (
        this.link.length === 0 && event.target.files && event.target.files[0]
      );
    },
  },
  methods: {
    updatePreview(event) {
      const imagePreview = this.$el.querySelector('.upload__image-preview');

      const target = this.isFile
        ? URL.createObjectURL(event.target.files[0])
        : this.link;

      imagePreview.src = target;

      if (this.isFile) imagePreview.onload = () => URL.revokeObjectURL(imagePreview.src);
    },
    async updateFile(event) {
      if (!this.isFile) {
        this.updatePreview(event);
        this.$emit('fileChanged', {
          current: this.current,
          link: this.link,
        });

        return;
      }

      store.dispatch('shiftLoading', true);

      try {
        this.updatePreview(event);

        const imageFile = event.target.files[0];
        const options = {
          maxSizeMB: this.maxSizeMB,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);

        const reader = new FileReader();
        const self = this;

        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          try {
            self.file.current = self.current;
            self.file.name = compressedFile.name;
            self.file.content = reader.result;

            self.$emit('fileChanged', self.file);
            console.log(self.file);

            store.dispatch('shiftLoading', false);
          } catch (error) {
            store.dispatch('shiftLoading', false);
            store.dispatch('spawnError', {
              message: `Erro ao retornar imagem: ${error.message}`,
            });
          }
        };
      } catch (error) {
        store.dispatch('shiftLoading', false);
        store.dispatch('spawnError', {
          message: `Erro ao processar imagem: ${error.message}`,
        });
      }
    },
    expandImage(event) {
      event.preventDefault();

      const image = this.current;
      const popup = window.open(image, '_blank');
      popup.focus();
    },
    removeImage(event) {
      event.preventDefault();
      this.$emit('fileRemoved');
    },
  },
};
</script>

<style scoped src="./upload.css"></style>
