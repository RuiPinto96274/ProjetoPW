
document.getElementById('bottom-center').addEventListener('click', () => {
    Toastify({
        text: "Inscrição Newsletter com sucesso!",
        duration: 3000,
        close:true,
        gravity:"bottom",
        position: "center",
        backgroundColor: "#223843",
    }).showToast();
})