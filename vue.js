var app = new Vue({
	el: '#app',
	data: {
		currentPage: "home",
		mobile: false,
		inputName: "",
		inputEmail: "",
		inputSubject: "",
		inputMessage: "",
		selectedProject: ""
	},
	
	methods: {
		setPage: function(targetPage) {
			this.currentPage = targetPage;
		},

		isMobile: function() {
			if(window.innerWidth < 480) {
				this.mobile = true;
			} else {
				this.mobile = false;
			}
		},

		rotation: function(e) {
			const target = e.target;
			if(!target.classList.contains("rotate-animation")){
				target.classList.add("rotate-animation");
				setTimeout(() => {
					target.classList.remove("rotate-animation");
				}, 1000)
			}
		},

		setProject: function(project) {
			this.selectedProject = this.projectDetails[project];
			this.setPage('projects');
		},

		sendEmail: function() {
			if(this.inputName && this.inputEmail && this.inputSubject && this.inputMessage) {
				var data = "inputName=" + encodeURIComponent(this.inputName) + "&inputEmail=" + encodeURIComponent(this.inputEmail) + "&inputSubject=" +
				encodeURIComponent(this.inputSubject) + "&inputMessage=" + encodeURIComponent(this.inputMessage);
				fetch("http://localhost:8080/emails", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: data

				}).then((response) => {
					if(response.body == 'error') {
						alert("Message failed to send...");
					} else {
						this.inputName = "";
						this.inputEmail = "";
						this.inputSubject = "";
						this.inputMessage = "";
						alert("Message sent successfully!");
					}
				});

			} else {
				if(!this.inputName){ document.querySelector("#input-name").classList.add("input-required"); }
				if(!this.inputEmail){ document.querySelector("#input-email").classList.add("input-required"); }
				if(!this.inputSubject){ document.querySelector("#input-subject").classList.add("input-required"); }
				if(!this.inputMessage){ document.querySelector("#input-message").classList.add("input-required"); }

				setTimeout(() => {
					document.querySelector("#input-name").classList.remove("input-required");
					document.querySelector("#input-email").classList.remove("input-required");
					document.querySelector("#input-subject").classList.remove("input-required");
					document.querySelector("#input-message").classList.remove("input-required");
				}, 750)
			}
		}
	},

	beforeMount(){
		this.isMobile();
	},

	created() {
		window.addEventListener("resize", this.isMobile);
	},

	destroyed() {
		window.removeEventListener("resize", this.isMobile);
	}
});