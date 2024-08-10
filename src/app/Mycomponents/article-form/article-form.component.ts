// article-form.component.ts
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent {
  title = '';
  content = '';
  filePreview: string | ArrayBuffer | null = null;
  fileSelected = false;
  fileType: string = '';
  postUrl: string = '';

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      if (file.type.startsWith('image/')) {
        this.fileType = 'image';
      } else if (file.type === 'application/pdf') {
        this.fileType = 'pdf';
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.fileType = 'docx';
      } else {
        this.fileType = '';
      }

      reader.onload = () => {
        this.filePreview = reader.result;
        this.fileSelected = true;
      };

      reader.readAsDataURL(file);
    }
  }

  removeFile() {
    this.filePreview = null;
    this.fileSelected = false;
    this.fileType = '';
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
  }

  showShareOptions() {
    const shareModal = document.getElementById('shareModal') as HTMLElement;
    if (shareModal) {
      shareModal.style.display = 'flex';
    }
  }

  closeShareModal() {
    const shareModal = document.getElementById('shareModal') as HTMLElement;
    if (shareModal) {
      shareModal.style.display = 'none';
    }
  }

  generatePost() {
    const postContainer = document.getElementById('postsContainer');

    if (!postContainer) return;

    const newPost = document.createElement('div');
    newPost.classList.add('card');
    newPost.style.width = '25rem';
    newPost.classList.add('mb-3');
    const uniqueId = 'carouselExample' + Date.now();

    const fileContent = this.fileType === 'image'
      ? `<div id="${uniqueId}" class="carousel slide">
           <div class="carousel-inner">
             <div class="carousel-item active">
               <img src="${this.filePreview}" class="d-block w-100" alt="Image Preview">
             </div>
           </div>
           
         </div>`
      : this.fileType === 'pdf'
        ? `<iframe src="${this.filePreview}" class="d-block w-100" style="height: 300px; border: none;"></iframe>`
        : this.fileType === 'docx'
          ? `<iframe src="${this.filePreview}" class="d-block w-100" style="height: 300px; border: none;"></iframe>`
          : '';

    newPost.innerHTML = `
      <div class="post-content">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text">${this.content}</p>
          ${fileContent}
        </div>
      </div>
    `;
    postContainer.appendChild(newPost);

    // Clear the form data
    this.title = '';
    this.content = '';
    this.filePreview = null;
    this.fileSelected = false;
    this.fileType = '';
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
  }

  shareToWhatsApp() {
    const message = `Check out this post: ${this.postUrl}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappShareUrl, '_blank');
  }

  shareToLinkedIn() {
    const message = `Check out this post: ${this.postUrl}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.postUrl)}&summary=${encodeURIComponent(message)}`;
    window.open(linkedInShareUrl, '_blank');
  }

  shareToInstagram() {
    const message = `Check out this post: ${this.postUrl}`;
    // Instagram does not support direct URL sharing via web; consider directing users to the Instagram app.
    alert('Instagram does not support direct URL sharing via web. Please share the link manually.');
  }
}