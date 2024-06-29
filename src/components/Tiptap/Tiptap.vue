<template>
  <div class="tiptap-container border border-gray-300 rounded-md p-4 flex flex-col gap-4">
    <div class="toolbar flex items-center gap-1">
      <a-button type="text" :disabled="!canUndo" @click="undo">
        <template #icon>
          <UndoOutlined />
        </template>
      </a-button>
      <a-button type="text" :disabled="!canRedo" @click="redo">
        <template #icon>
          <RedoOutlined />
        </template>
      </a-button>
      <a-divider type="vertical" class="bg-gray-300 h-7" />
      <a-button :type="isExtensionActive('heading', { level: 1 })" @click="toggleH1">
        <template #icon> H1 </template>
      </a-button>
      <a-button :type="isExtensionActive('heading', { level: 2 })" @click="toggleH2">
        <template #icon> H2 </template>
      </a-button>
      <a-button :type="isExtensionActive('heading', { level: 3 })" @click="toggleH3">
        <template #icon> H3 </template>
      </a-button>
      <a-divider type="vertical" class="bg-gray-300 h-7" />
      <a-button :type="isExtensionActive('bold')" @click="toggleBold">
        <template #icon>
          <BoldOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('italic')" @click="toggleItalic">
        <template #icon>
          <ItalicOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('underline')" @click="toggleUnderline">
        <template #icon>
          <UnderlineOutlined />
        </template>
      </a-button>
      <a-divider type="vertical" class="bg-gray-300 h-7" />
      <a-button :type="isExtensionActive('bulletList')" @click="toggleBulletList">
        <template #icon>
          <UnorderedListOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('orderedList')" @click="toggleOrderedList">
        <template #icon>
          <OrderedListOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('code')" @click="toggleCode">
        <template #icon>
          <CodeOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('blockquote')" @click="toggleBlockquote">
        <template #icon> "" </template>
      </a-button>
      <a-divider type="vertical" class="bg-gray-300 h-7" />
      <a-button :type="isExtensionActive('link')" @click="handleClickLinkButton">
        <template #icon>
          <LinkOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('image')" @click="handleClickImageButton">
        <template #icon>
          <FileImageOutlined />
        </template>
      </a-button>
      <a-button :type="isExtensionActive('horizontalRule')" @click="addHorizontal">
        <template #icon>
          <MinusOutlined />
        </template>
      </a-button>
    </div>
    <editor-content
      :editor="editor"
      class="border border-gray-300 rounded-md h-60 overflow-y-auto"
    />
  </div>
  <LinkModal
    :open="linkModal.open"
    :link="linkModal.link"
    @ok="handleLinkModalOk"
    @close="handleLinkModalClose"
  />
  <FileModal :open="fileModal.open" @ok="handleFileModalOk" @close="handleFileModalClose" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { UndoOutlined,
  BoldOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  LinkOutlined,
  FileImageOutlined,
  MinusOutlined,
  RedoOutlined,
  CodeOutlined,
  OrderedListOutlined,
  UnorderedListOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import LinkModal from '@/components/Tiptap/LinkModal.vue'
import FileModal from '@/components/Tiptap/FileModal.vue'
import Image from '@tiptap/extension-image'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:value'])

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3]
      },
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc pl-4'
        }
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal pl-4'
        }
      }
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
      HTMLAttributes: {
        class: '!text-sky-600 hover:text-sky-700 hover:underline'
      }
    }),
    Image
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-full'
    }
  },
  onUpdate ({ editor }) {
    emit('update:value', editor.getHTML())
  }
})

watch(
  () => props.value,
  (newValue) => {
    if (newValue !== editor.value.getHTML()) {
      editor.value.commands.setContent(newValue, false)
    }
  }
)

const isExtensionActive = (extention, attributes = {}) => {
  return editor?.value?.isActive(extention, attributes) ? 'primary' : 'text'
}

const canUndo = computed(() => editor?.value?.can().undo())

const canRedo = computed(() => editor?.value?.can().redo())

const undo = () => {
  editor.value.chain().focus().undo().run()
}

const redo = () => {
  editor.value.chain().focus().redo().run()
}

const toggleH1 = () => {
  editor.value.chain().focus().toggleHeading({ level: 1 }).run()
}

const toggleH2 = () => {
  editor.value.chain().focus().toggleHeading({ level: 2 }).run()
}

const toggleH3 = () => {
  editor.value.chain().focus().toggleHeading({ level: 3 }).run()
}

const toggleBold = () => {
  editor.value.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  editor.value.chain().focus().toggleItalic().run()
}

const toggleUnderline = () => {
  editor.value.chain().focus().toggleUnderline().run()
}

const toggleBulletList = () => {
  editor.value.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = () => {
  editor.value.chain().focus().toggleOrderedList().run()
}

const toggleCode = () => {
  editor.value.chain().focus().toggleCode().run()
}

const toggleBlockquote = () => {
  editor.value.chain().focus().toggleBlockquote().run()
}

const linkModal = ref({
  open: false,
  link: ''
})
const handleClickLinkButton = () => {
  linkModal.value.open = true
  linkModal.value.link = editor.value.getAttributes('link').href || ''
}

const handleLinkModalOk = (value) => {
  linkModal.value.open = false

  if (!value) {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: value }).run()
}

const handleLinkModalClose = () => {
  linkModal.value.open = false
}

const fileModal = ref({
  open: false,
  value: ''
})
const handleClickImageButton = () => {
  fileModal.value.open = true
}

const handleFileModalOk = (file) => {
  fileModal.value.open = false
  editor.value.chain().focus().setImage({ src: file.url }).run()
}

const handleFileModalClose = () => {
  fileModal.value.open = false
}

const addHorizontal = () => {
  editor.value.chain().focus().setHorizontalRule().run()
}
</script>
<style></style>
