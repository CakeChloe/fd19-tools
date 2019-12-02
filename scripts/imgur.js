var Imgur = function(canvas) {
	this.upload = function(finish) {
		try {
			canvas = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
		} catch(e) {
			canvas = canvas.toDataURL().split(',')[1];
		}

		$.ajax({
			url: "https://api.imgur.com/3/image",
			type: "post",
			headers: {
				Authorization: "Client-ID bbaed846d9cd236"
			},

			data: {
				image: canvas
			},

			dataType: "json",
			success: function(response) {
				if(response.success) {
					finish(response.data);
				}
			}
		});
	};
};