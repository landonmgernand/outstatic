import { encode } from 'js-base64'

type contentTypeCommitInputType = {
  owner: string
  oid: string
  remove?: boolean
  repoSlug: string
  contentPath: string
  monorepoPath: string
  contentType: string
}

export const contentTypeCommitInput = ({
  owner,
  oid,
  remove = false,
  repoSlug,
  contentPath,
  monorepoPath,
  contentType
}: contentTypeCommitInputType) => {
  let fileChanges = {}
  const additions = []
  const deletions = []

  if (remove) {
    deletions.push({
      path: `${monorepoPath ? monorepoPath + '/' : ''}${contentPath}/${contentType}`
    })
    fileChanges = { ...fileChanges, deletions }
  } else {
    additions.push({
      path: `${monorepoPath ? monorepoPath + '/' : ''}${contentPath}/${contentType}/.gitkeep`,
      contents: encode('')
    })
    fileChanges = { additions }
  }

  const headline = !remove
    ? `feat(content): create ${contentType}`
    : `feat(content): remove ${contentType}`

  return {
    input: {
      branch: {
        repositoryNameWithOwner: `${owner}/${repoSlug}`,
        branchName: 'main'
      },
      message: {
        headline
      },
      fileChanges,
      expectedHeadOid: oid
    }
  }
}
