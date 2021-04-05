import React, { Component } from "react";
import axios from "axios";
import './index.css';

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  componentDidMount() {
    this.getPhotos(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }
  // `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
  getPhotos(page) {
    this.setState({ loading: true });
    axios
      .get(
        `http://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=10`
      )
      .then(res => {
        this.setState({ photos: [...this.state.photos, ...res.data] });
        this.setState({ loading: false });
      });
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPhoto = this.state.photos[this.state.photos.length - 1];
      const curPage = lastPhoto.albumId;
      this.getPhotos(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }
  demo(){
    alert("hello")
  }
  render() {
   // Additional css
   const loadingCSS = {
    height: "100px",
    margin: "30px"
  };

  // To change the loading icon behavior
  const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

  const ContentCss = {width: "100%",
    height: "100px",
    backgroundColor: "#000",
    color: "#fff",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "10px"
  }


  return (
    <div className="container">
      <div style={{ minHeight: "800px" }}>

        {this.state.photos.map(user => (
          <div style={ContentCss} key={user.id} onClick={this.demo}> 
            <h3>{user.title}</h3>
            <p>{user.body}</p>
            </div>
          
          // <img src={user.url} height="100px" width="200px" />
        ))}
       
      </div>
      <div
        ref={loadingRef => (this.loadingRef = loadingRef)}
        style={loadingCSS}
      >
        <span style={loadingTextCSS}>Loading...</span>
      </div>
    </div>
  );

  }
}

export default ScrollComponent;