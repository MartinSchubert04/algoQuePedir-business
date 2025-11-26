<script lang="ts">
	import { page } from "$app/state";
	import "$lib/styles/global.css";
	import notFoundErrorImage from "$lib/assets/error404.png";

	// Page contiene informacion sobre el error
	//  page.status -> codigo de error
	//  page.error -> objeto Error con el mensaje -> { message: string }
	//  page.url -> URL donde se produjo el error
</script>

<section class="error">
	<img
		class="error-img"
		src={notFoundErrorImage}
		alt={`${page.status} error: ${page.error?.message ?? "Algo salió mal."}`}
	/>

	<p class="error-info">
		<span class="status">{`Error ${page.status}:`}</span>
		<span>{page.error?.message ?? "Algo salió mal."}</span>
	</p>

	<a class="goBack" href="/">Ir al inicio</a>
</section>

<style>
	.error {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--background-gris);
	}

	.error-img {
		height: 20rem;
	}

	.error-info {
		color: var(--color-primario);
		font-weight: bold;
		font-size: 2rem;
		margin: 20px;
	}

	.goBack,
	.goBack:hover,
	.goBack:visited,
	.goBack:active,
	.goBack:focus {
		color: var(--color-sombra);
		text-decoration: underline;
		cursor: pointer;
		font-weight: bold;
		text-decoration: none;
	}
</style>
