import { useTheme } from '@emotion/react';
import { FunctionComponent, MouseEvent, ReactElement, ReactNode } from 'react';
import {
  IconChevronRight,
  IconComponent,
  IconDotsVertical,
  LightIconButton,
  LightIconButtonProps,
} from 'twenty-ui';

import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { MenuItemLeftContent } from '../internals/components/MenuItemLeftContent';
import {
  StyledHoverableMenuItemBase,
  StyledMenuItemLeftContent,
} from '../internals/components/StyledMenuItemBase';
import { MenuItemAccent } from '../types/MenuItemAccent';

export type MenuItemIconButton = {
  Wrapper?: FunctionComponent<{ iconButton: ReactElement }>;
  Icon: IconComponent;
  accent?: LightIconButtonProps['accent'];
  onClick?: (event: MouseEvent<any>) => void;
};

export type MenuItemWithOptionDropdownProps = {
  accent?: MenuItemAccent;
  className?: string;
  dropdownContent: ReactNode;
  dropdownId: string;
  isIconDisplayedOnHoverOnly?: boolean;
  isTooltipOpen?: boolean;
  LeftIcon?: IconComponent | null;
  RightIcon?: IconComponent | null;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  testId?: string;
  text: ReactNode;
  hasSubMenu?: boolean;
};

// TODO: refactor this
export const MenuItemWithOptionDropdown = ({
  accent = 'default',
  className,
  isIconDisplayedOnHoverOnly = true,
  dropdownContent,
  dropdownId,
  LeftIcon,
  RightIcon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  testId,
  text,
  hasSubMenu = false,
}: MenuItemWithOptionDropdownProps) => {
  const theme = useTheme();

  const handleMenuItemClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    event.preventDefault();
    event.stopPropagation();

    onClick?.(event);
  };

  return (
    <StyledHoverableMenuItemBase
      data-testid={testId ?? undefined}
      onClick={handleMenuItemClick}
      className={className}
      accent={accent}
      isIconDisplayedOnHoverOnly={isIconDisplayedOnHoverOnly}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledMenuItemLeftContent>
        <MenuItemLeftContent LeftIcon={LeftIcon ?? undefined} text={text} />
      </StyledMenuItemLeftContent>
      <div className="hoverable-buttons">
        <Dropdown
          clickableComponent={
            <LightIconButton
              Icon={RightIcon ?? IconDotsVertical}
              size="small"
            />
          }
          dropdownComponents={dropdownContent}
          dropdownId={dropdownId}
          dropdownHotkeyScope={{ scope: 'sd' }}
          disableBlur
        />
      </div>
      {hasSubMenu && (
        <IconChevronRight
          size={theme.icon.size.sm}
          color={theme.font.color.tertiary}
        />
      )}
    </StyledHoverableMenuItemBase>
  );
};