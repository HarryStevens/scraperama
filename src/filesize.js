import fmt from "filesize";
import sizeof from "object-sizeof";

export default function filesize(object) {
  return fmt(sizeof(object));
}
