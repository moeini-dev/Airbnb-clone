'use client';

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "./Container";
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland, 
  GiWindmill 
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool!'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake!'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property is a castle!'
  },
  {
    label: 'Camping ',
    icon: GiForestCamp,
    description: 'This property has camping activities!'
  }, 
  {
    label: 'Arctic ',
    icon: BsSnow,
    description: 'This property is in an arctic area!'
  },
  {
    label: 'Cave ',
    icon: GiCaveEntrance,
    description: 'This property is in a cave!'
  },
  {
    label: 'Desert ',
    icon: GiCactus,
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious!'
  },
]


function Categories() {

  const params = useSearchParams();
  const category = params?.get('category'); 

  // Only shows category section on the home page
  const pathname = usePathname();
  if(pathname !== '/') {
    return null;
  }

  return (
    <Container>
      <div className="
        flex
        items-center
        justify-between
        overflow-x-auto
      "> 
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={<item.icon size={24} />}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;