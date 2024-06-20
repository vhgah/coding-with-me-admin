<template>
    <editor-content :editor="editor" />
  </template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
  ],
})
</script>