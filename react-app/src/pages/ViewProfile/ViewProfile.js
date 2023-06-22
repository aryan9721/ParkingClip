import React from 'react'

const ViewProfile = () => {
  return (
    <div className="body">
    <div className="formContainer">
      <h3>Here's Your Profile</h3>

      <form>
        <div style={{ width: "100%" }} className="formInput">
          <label>Full Name*</label>
          <input disabled="true" type={Text} placeholder={data['name']} />
        </div>
        <div style={{ width: "100%" }} className="formInput">
          <label>Aadhar Number</label>
          <input disabled="true" type={Text} placeholder={data['aadhar']} />
        </div>
        <div className="formInput">
          <label>Contact No*</label>
          <input disabled="true" 
            style={{
              padding: "8px",
              border: "1px solid gray",
              borderRadius: "5px",
              height: "auto",
            }}
            type={"tel"}
            placeholder={data['contact']}
          />
        </div>
        <div className="formInput">
          <label>Parking site location*</label>
          <input disabled="true" type={"text"} placeholder={data['siteLocation']}/>
        </div>
        <div className="formInput">
          <label>Ticket mode*</label>
          <input disabled="true" type={"text"} placeholder={data['Ticketmode']} />
        </div>
        <div className="formInput">
          <label>Job allocated*</label>
          <input disabled="true" type={"text"} placeholder={data['job']} />

        </div>
        <div className="profileImg">
          <img style={{height: 150,width: 150, borderRadius: "50%"}} src={data['profileImg']} alt=""/>
        </div>
      </form>
    </div>
  </div>  )
}

export default ViewProfile