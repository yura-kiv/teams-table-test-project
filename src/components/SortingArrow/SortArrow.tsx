import { Order } from "../../models/sorting.models";
import SortDownIcon from "../Icons/SortDownIcon";
import SortNoneIcon from "../Icons/SortNoneIcon";
import styles from "./SortArrow.module.scss";

interface SortArrowProps {
  order: Order | null;
}

export const SortArrow: React.FC<SortArrowProps> = ({ order }) => {
  const arrowSizes = {
    height: 12,
    width: 12,
    className: styles.sortIcon,
  };

  if (order) {
    if (order === Order.Asc)
      return (
        <SortDownIcon
          {...arrowSizes}
          style={{ transform: "rotate(180deg)" }}
        />
      );
    else
      return (
        <SortDownIcon
          {...arrowSizes}
          style={{ transform: "rotate(0deg)" }}
        />
      );
  } else {
    return <SortNoneIcon {...arrowSizes} />;
  }
};
