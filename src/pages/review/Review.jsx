import ReviewList from "./ReviewList";
import { useNavigate } from "react-router-dom";
import '../../components/css/review/Review.css';

const Review = ()=> {
  const nav = useNavigate();
  return (
    <>
<<<<<<< HEAD
    <div className="Review1">
      <div className="Review">  
        <h3>후기게시판</h3> 
        <ReviewList/>    
      </div>
      <div className="ReviewButton">
        <div className="ReviewSearch">
          <input placeholder="검색어를 입력해주세요"/>
          <button>검색</button>
        </div>      
        <button className="primary" onClick={() => nav('/reviewWrite')}>후기쓰기</button>
      </div> 
=======
    <div className="Review">  
      <h3>후기게시판</h3>   
      <div>
        <ReviewList/>       
      </div>           
>>>>>>> Y
    </div>
    <div className="ReviewButton">
      <div className="ReviewSearch">
        <input placeholder="검색어를 입력해주세요"/>
        <button>검색</button>
      </div>      
      <button className="primary" onClick={() => nav('/reviewWrite')}>후기쓰기</button>
    </div>  
    </>
  );
};

export default Review;