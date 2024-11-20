<template>
  <editor v-model="content" :init="options" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { ref, watch, computed } from 'vue'

import Editor from '@tinymce/tinymce-vue'
import { useRoute } from 'vue-router'

import { randomString } from '@/helpers/string'

import 'tinymce/tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/link'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/code'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },

  readonly: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String as PropType<'full' | 'simple'>,
    default: 'full'
  },
  height: {
    type: Number,
    default: 500
  },
  placeholder: {
    type: String,
    default: undefined
  },
  toolbar: {
    type: Array,
    default: () => []
  }
})

const $emit = defineEmits(['update:value'])

const content = ref(props.value)
const editorInstance = ref<typeof Editor>()

/**
 * Always enable fullscreen button even if the editor is in readonly mode
 */
const keepFullScreenAlwaysClickable = () => {
  setTimeout(() => {
    const fullscreenButton = document.querySelector(
      '.tox-toolbar__primary button[aria-label="Fullscreen"]'
    )

    if (fullscreenButton) {
      fullscreenButton.removeAttribute('aria-disabled')
    }
  }, 500)
}

const optionToolbar = computed(() => {
  const enabledToolbar = props.toolbar

  let allTollbars = [
    {
      name: 'formatselect',
      items: ['formatselect']
    },
    {
      name: 'font-style',
      items: ['bold', 'italic', 'underline', 'strikethrough']
    },
    {
      name: 'font-color',
      items: ['forecolor', 'backcolor']
    },
    {
      name: 'list',
      items: ['bullist', 'numlist']
    },
    {
      name: 'align',
      items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
    },
    {
      name: 'media',
      items: ['media', 'link', 'add-image', 'table']
    },
    {
      name: 'tools',
      items: ['removeformat', 'fullscreen']
    }
  ]

  if (enabledToolbar.length) {
    allTollbars = allTollbars.filter((toolbar) => enabledToolbar.includes(toolbar.name))
  }

  if (useRoute().query?.sh_debug === 'true') {
    allTollbars.push({ name: 'code', items: ['code'] })
  }

  return allTollbars
})

const options = computed(() => {
  const hash = randomString()

  return {
    height: props.height,
    placeholder: props.placeholder,
    content_css: '/tinymce/skins/content/default/content.min.css?v=' + hash,
    skin_url: '/tinymce/skins/ui/oxide',
    plugins: ['lists', 'fullscreen', 'table', 'link', 'image', 'media', 'code'],
    image_caption: true,
    menubar: false,
    branding: false,
    readonly: props.readonly,
    toolbar: optionToolbar.value,

    setup: (editor) => {
      editorInstance.value = editor

      editor.ui.registry.addButton('add-image', {
        icon: 'image',
        onAction: function () {
          openFileBrowseModal()
        }
      })

      keepFullScreenAlwaysClickable()
    }
  }
})

watch(content, () => $emit('update:value', content.value))

watch(
  () => props.value,
  () => (content.value = props.value),
  {
    immediate: true
  }
)

watch(
  () => props.readonly,
  () => {
    setTimeout(() => {
      if (props.readonly) {
        editorInstance.value?.setMode('readonly')
      } else {
        editorInstance.value?.setMode('design')
      }
    }, 500)
    keepFullScreenAlwaysClickable()
  },
  {
    immediate: true
  }
)

const openFileBrowseModal = () => {
  const key = randomString()
  fileBrowseModalStore.setKey(key)

  fileBrowseModalStore.setFilter({
    page: 1,
    type: ['image']
  })

  fileBrowseModalStore.setTitle(__('Select image'))
  fileBrowseModalStore.setMultiple(true)
  fileBrowseModalStore.openModal()

  fileBrowseModalStore.onFinish((onKey, onFiles) => {
    if (key != onKey) {
      return
    }

    for (const file of onFiles) {
      const imgHTML = `<img src="${file.resized.large}" />`
      editorInstance.value?.execCommand('mceInsertContent', false, imgHTML)
    }

    fileBrowseModalStore.closeModal()
  })
}
</script>
