import React from 'react'
import styled from 'styled-components'

type IProps = { src: string; link: string }

const IconLink: React.FC<IProps> = ({ src, link }) => {
  return (
    <Link href={link} target='_blank'>
      <img src={src}></img>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
`

export default IconLink
