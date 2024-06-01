import { createPortal } from 'react-dom'

type CreatePortalProps = {
  children: React.ReactNode
  container: Element | DocumentFragment
}

export const createWrapper = (
  wrapperId: string,
  style: string = '',
  role?: string
) => {
  let wrapper = document.getElementById(wrapperId)
  if (!wrapper) {
    wrapper = document.createElement('div')
    wrapper.setAttribute('id', wrapperId)
    role ? wrapper.setAttribute('role', role) : {}
    style !== '' ? wrapper.setAttribute('style', style) : {}
    document.body.appendChild(wrapper)
  }
  return wrapper
}

export const removeWrapper = (wrapperId: string) => {
  const wrapper = document.getElementById(wrapperId)

  if (wrapper) wrapper.remove()
}

const CreatePortal: React.FC<CreatePortalProps> = ({ children, container }) => {
  return createPortal(children, container)
}

export default CreatePortal
