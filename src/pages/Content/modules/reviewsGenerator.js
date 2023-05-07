function ReviewGenerator (id, data){

    const mainDiv = document.createElement('div')
    mainDiv.setAttribute('id', id);
    
    const overviewReview2 = document.createElement('div');
    overviewReview2.setAttribute('class','iynKDA');
  
    mainDiv.appendChild(overviewReview2);
  
    const overviewReviewTitle2 = document.createElement('div');
    overviewReviewTitle2.setAttribute('class','ixxElA');
  
    overviewReview2.appendChild(overviewReviewTitle2);
  
    const overviewReviewTitleText2 = document.createElement('a');
    overviewReviewTitleText2.setAttribute('class','udqtB');
    overviewReviewTitleText2.innerHTML=`${id+1}. ${data.title}`
  
    overviewReviewTitle2.appendChild(overviewReviewTitleText2);
  
    const overviewReviewUser2 = document.createElement('div');
    overviewReviewUser2.setAttribute('class','ixxElA');
  
    overviewReview2.appendChild(overviewReviewUser2);
  
    const overviewReviewUserDetail2 = document.createElement('div');
    overviewReviewUserDetail2.setAttribute('class','fpVYlo');
    overviewReviewUserDetail2.innerHTML=`By ${data.author}, Reviewed in ${data.city}, ${data.state} ${data.created_on}`
  
    overviewReviewUser2.appendChild(overviewReviewUserDetail2);
  
    const overviewReviewDetail2 = document.createElement('div');
    overviewReviewDetail2.setAttribute('class','kqSYrC');
    overviewReviewDetail2.innerHTML=`${data.description}`;
  
    overviewReview2.appendChild(overviewReviewDetail2);
  
    const overviewReviewHelpful2 = document.createElement('div');
    overviewReviewHelpful2.setAttribute('class','ekqgTH');
    overviewReviewHelpful2.innerHTML=`${data.upvote} people found this helpful`
    overviewReview2.appendChild(overviewReviewHelpful2);

    return mainDiv;
}

export default ReviewGenerator;