import { Link } from '@mui/material';
import type { FC } from 'react';

type IProps = {
  currentPath: string;
  expectedPath: string;
  content: string;
  href: string;
};

const NavbarItem: FC<IProps> = ({
  currentPath,
  content,
  expectedPath,
  href,
}) => {
  return (
    <Link
      href={href}
      color="white"
      underline="none"
      sx={{
        opacity: currentPath === expectedPath ? '1' : '0.7',
        '&:hover': {
          opacity: '1',
        },
      }}
    >
      {content}
    </Link>
  );
};

export default NavbarItem;
