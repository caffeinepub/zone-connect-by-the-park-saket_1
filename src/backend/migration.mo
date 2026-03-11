import List "mo:core/List";

module {
  type OldSubmission = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type OldActor = {
    inquiryList : List.List<OldSubmission>;
  };

  type NewSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    message : Text;
    timestamp : Int;
  };

  type NewActor = {
    submissionList : List.List<NewSubmission>;
  };

  public func run(old : OldActor) : NewActor {
    let newSubmissionList = List.empty<NewSubmission>();
    for (oldSubmission in old.inquiryList.values()) {
      let newSubmission : NewSubmission = {
        name = oldSubmission.name;
        email = "unknown";
        phone = oldSubmission.phone;
        company = "unknown";
        message = oldSubmission.message;
        timestamp = oldSubmission.timestamp;
      };
      newSubmissionList.add(newSubmission);
    };
    { submissionList = newSubmissionList };
  };
};
