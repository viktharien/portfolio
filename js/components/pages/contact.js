class Contact extends React.Component {
  constructor(props){
    super(props);
    this.timestamp = this.props.time[0];
    this.time = this.props.time[1];
  }
  componentDidMount() {
    $('#envelope').addClass('animated fadeInLeftBig');
    $('#contactme').click((e)=>{
      let time = this.time;
      let timeString = `${time.locale.split('/').join('-')}`;
      let formName = $('#formName').val();
      let formEmail = $('#formEmail').val();
      let formMsg = $('#formMsg').val();
      let id = localStorage.getItem("clientID");
      console.log(JSON.stringify(id));
      e.preventDefault();
      document.getElementById('theform').reset();
      $('#envelope').addClass('animated fadeOutRightBig');
      $.ajax({
        url: 'https://glestbukken.firebaseio.com/inbox/' + timeString +'/'+ id + '.json',
        type: 'POST',
        data: JSON.stringify({
          client: 'Portfolio',
          name: formName,
          email: formEmail,
          message: formMsg,
          at: `${time.hour}:${time.min}`
        }),
        dataType: 'json',
        contentType: 'application/json',
        success(response) {
          //
        },
        error(jqXHR,status,errorThrown) {
          console.log(jqXHR);
        }
      });
      setTimeout(()=>{
        $('#envelope').css('display','none');
        $('#thanks').css('display','block');
        $('#thanks').addClass('animated fadeInRightBig');
      },250);
      
    });
  }
  render(){
    return (
    <div id='contact' className='page'>
        <div id='thanks'>
          <h1>Thank you! Guess what - you win!</h1>
          <p>We'll be in touch.</p>
        </div>
        <div id='envelope'>
          <div>
            <form id='theform'>
              <input id='formName' type='text' placeholder='Your Name'/><br/>
              <input id='formEmail' type='email' placeholder='Your E-mail'/><br/>
              <textarea id='formMsg' placeholder='Your Message' cols='22' rows='5'/><br/>
              <button id='contactme' type="submit">Contact Me Now!</button>
            </form>
          
            <p>Not keen on a form? Reach out to me via e-mail directly or by phone:</p>
            <ul>
              <li>viktharien@zoho.com</li>
              <li>(682) 410-8053</li>
            </ul>
          </div>
          
        </div>
    </div>
    );
  }
}

export default Contact;