import React from 'react';
import SortBy from '@/components/Other/SortBy';

interface MobileFilterBarProps {
  sortOption: boolean;
  setSortOption: (value: boolean) => void;
  mobileFilter: boolean;
  setMobileFilter: (value: boolean) => void;
  handleSortOptionChange: (option: string) => void;
}

const MobileFilterBar: React.FC<MobileFilterBarProps> = ({
  sortOption,
  setSortOption,
  mobileFilter,
  setMobileFilter,
  handleSortOptionChange,
}) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 h-[52px] w-[100%] bg-[#e26178] sm:block md:hidden lg:hidden">
        <div className="mt-4 flex justify-center align-middle text-white">
          <div className="mr-5" onClick={() => setSortOption(!sortOption)}>
            SortBy
          </div>
          <div className="flex" onClick={() => setMobileFilter(!mobileFilter)}>
            <p>Filter </p>
          </div>
        </div>
      </div>
      {sortOption && (
        <SortBy
          visible={sortOption}
          onClose={() => setSortOption(false)}
          onSortOptionChange={handleSortOptionChange}
        />
      )}
    </>
  );
};

export default MobileFilterBar; 