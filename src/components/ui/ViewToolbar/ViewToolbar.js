import React from 'react';
import { SearchNormal1 } from 'iconsax-react';
import { Input } from '../Input/Input';
import { DropdownFilter } from '../DropdownFilter/DropdownFilter';
import './ViewToolbar.css';

/**
 * ViewToolbar — full-width search + filter bar used across list/table views.
 *
 * Props:
 *   searchValue      – controlled value for the search input
 *   onSearchChange   – onChange handler for the search input
 *   itemCount        – number of items to show in the placeholder (e.g. 212233)
 *   itemLabel        – label describing the item type (e.g. "users", "companies")
 *   filters          – array of filter configs:
 *                        { placeholder, icon, items, multiSelect, value, onChange }
 */
export const ViewToolbar = React.forwardRef(
  (
    {
      searchValue,
      onSearchChange,
      itemCount,
      itemLabel = 'items',
      filters = [],
      className,
      ...rest
    },
    ref
  ) => {
    const formattedCount =
      itemCount != null ? Number(itemCount).toLocaleString() : null;
    const placeholder = formattedCount
      ? `Search ${formattedCount} ${itemLabel}...`
      : `Search ${itemLabel}...`;

    return (
      <div
        ref={ref}
        className={['view-toolbar', className ?? ''].filter(Boolean).join(' ')}
        {...rest}
      >
        <div className="view-toolbar__search">
          <Input
            leftIcon={
              <SearchNormal1 size={20} variant="Linear" color="currentColor" />
            }
            placeholder={placeholder}
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>
        {filters.length > 0 && (
          <div className="view-toolbar__filters">
            {filters.map((filter, i) => (
              <DropdownFilter
                key={i}
                placeholder={filter.placeholder}
                selectorIcon={filter.icon}
                withSelectorIcon={!!filter.icon}
                items={filter.items ?? []}
                multiSelect={filter.multiSelect ?? false}
                value={filter.value}
                onChange={filter.onChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ViewToolbar.displayName = 'ViewToolbar';
