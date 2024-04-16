import { BuhDropdown } from "./buh-dropdown";

export class BuhDropdownList {
    constructor(
        public control: BuhDropdown[] = [],
        public about: BuhDropdown[] = [],
        public mark: BuhDropdown[] = [],
        public status: BuhDropdown[] = [],
    ) { }
}
