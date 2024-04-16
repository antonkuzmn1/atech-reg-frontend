import { Injectable } from "@angular/core";
import { BuhAllService } from "../buh-all.service";

@Injectable({ providedIn: 'root' })
export class BuhAllNew {
    constructor(private service: BuhAllService) { }

    copyDate: string = '';
    origDate: string = '';
    date: string = '';
    contractor: string = '';
    initiator: string = '';
    status: { id: number, text: string } = { id: 0, text: '' };
    destination: string = '';
    title: string = '';
    sum: number = 0;
    number: number = 0;

    reset(): void {
        this.copyDate = '';
        this.origDate = '';
        this.date = '';
        this.contractor = '';
        this.initiator = '';
        this.status = { id: 0, text: '' };
        this.destination = '';
        this.title = '';
        this.sum = 0;
        this.number = 0;
    }

    submit(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.initiator) { alert('Поле "Инициатор" обязательно'); reject(false); return }
            if (!this.contractor) { alert('Поле "Контрагент" обязательно'); reject(false); return }
            if (!this.destination) { alert('Поле "Наименование" обязательно'); reject(false); return }
            if (!this.number) { alert('Поле "Номер документа" обязательно'); reject(false); return }
            if (!this.date) { alert('Поле "Дата документа" обязательно'); reject(false); return }
            if (!this.sum) { alert('Поле "Сумма" обязательно'); reject(false); return }
            if (!this.status.id) { alert('Поле "Статус" обязательно'); reject(false); return }
            if (!this.copyDate) { alert('Поле "Дата предоставления копии" обязательно'); reject(false); return }
            if (!this.origDate) { alert('Поле "Дата предоставления оригинала" обязательно'); reject(false); return }
            this.service.new(this).subscribe({
                next: (data: boolean) => { if (data) resolve(true) }
            })
        })
    }
}