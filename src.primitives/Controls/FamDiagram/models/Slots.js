primitives.famdiagram.Slots = function () {
	this.first = null;
	this.last = null;

	this.slots = {};

	this.items = {};

	this.counter = 0;
};

primitives.famdiagram.Slots.prototype.add = function (slot) {
	slot.id = this.counter;
	this.counter += 1;

	this.slots[slot.id] = slot;
	if (slot.itemId != null) {
		this.items[slot.itemId] = slot;
	}

	if (this.last == null) {
		this.last = slot.id;
		this.first = slot.id;
	} else {
		this.slots[this.last].next = slot.id;
		slot.prev = this.last;

		this.last = slot.id;
	}
};

primitives.famdiagram.Slots.prototype.insertBefore = function (beforeSlot, slot) {
	slot.id = this.counter;
	this.counter+=1;
	this.slots[slot.id] = slot;
	if (slot.itemId != null) {
		this.items[slot.itemId] = slot;
	}

	if (beforeSlot.prev == null) {
		slot.next = beforeSlot.id;
		this.first = slot.id;
	} else {
		var prevSlot = this.slots[beforeSlot.prev];
		prevSlot.next = slot.id;
		slot.next = beforeSlot.id;
		beforeSlot.prev = slot.id;
		slot.prev = prevSlot.id;
	}
};

primitives.famdiagram.Slots.prototype.loop = function (callback, startSlot) {
	var slotid = startSlot != null ? startSlot.id : this.first,
		slot;

	while (slotid != null) {
		slot = this.slots[slotid];

		if (callback(slot)) {
			break;
		}

		slotid = slot.next;
	}
};

primitives.famdiagram.Slots.prototype.backwardLoop = function (callback, startSlot) {
	var slotid = startSlot != null ? startSlot.id : this.last,
		slot;

	while (slotid != null) {
		slot = this.slots[slotid];

		if (callback(slot)) {
			break;
		}

		slotid = slot.prev;
	}
};

primitives.famdiagram.Slots.prototype.getSlot = function (itemId) {
	return this.items[itemId];
};