/** Re-export registry project-brief so installed blocks resolve `@/lib/project-brief` in docs previews. */
export {
  EMPTY_PROJECT_BRIEF,
  PROJECT_BRIEF_STORAGE_KEY,
  briefFromScopeMessage,
  briefOgSubtitle,
  briefOgTitle,
  briefThumbnailTitle,
  buildOgHref,
  buildThumbnailHref,
  isProjectBrief,
  parseProjectBrief,
  type ProjectBrief,
} from "../registry/default/lib/project-brief"
