import { Component } from "@angular/core";

@Component({
    selector: 'app-modal',
    standalone: true,
    template: `
        <section id='common-modal-frame'>
            <div class='background'>
                <div class='body'>
                    <div class='top'>
                        <p class='header' id='common-modal-top-header-text'></p>
                        <div (click)="close()" class='cross'>
                            <span>&times;</span>
                        </div>
                    </div>
                    <div class='main'>
                        <div class='content'>
                            <ng-content></ng-content>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    styleUrl: '../../assets/styles/components/modal.sass'
})
export class ModalComponent {
    open(text: string) {
        const element: HTMLElement | null = document.getElementById('common-modal-frame')
        const header: ChildNode | null | undefined = element?.firstChild?.firstChild?.firstChild?.firstChild
        if (element) element.style.display = 'block'
        if (header) header.textContent = text
    }
    close() {
        const element: HTMLElement | null = document.getElementById('common-modal-frame');
        const header: ChildNode | null | undefined = element?.firstChild?.firstChild?.firstChild?.firstChild
        if (element) element.style.display = 'none'
        if (header) header.textContent = ''
    }
}
