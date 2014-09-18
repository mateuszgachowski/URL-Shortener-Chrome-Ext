window.onload = function () {
	chrome.windows.getCurrent(function (currentWindow) {
		chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
			var url = activeTabs[0].url;
			var str = "url=" + url;

			var xhr = new XMLHttpRequest();
			xhr.open("PUT", "http://ur2.pl/api/addLink", true);
			xhr.onreadystatechange = function () {
				if(xhr.readyState == 4) {
					var response = JSON.parse(xhr.responseText);
					var responseContainer = document.getElementById('response');

					if(!response.error && !response.zonk) {
						responseContainer.innerHTML = response.fullURL;
					}
					else {
						responseContainer.innerHTML = response.msg;
					}
				}
			};
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.send(str);
		});
	});
};