<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<h2>TELENOR TEST - INDEX TITLE RSS FEED</h2>
		<table border="1">
			<tr bgcolor="#19aaf8">
				<th style="text-align:left">Title</th>
			</tr>
			<xsl:for-each select="rss/channel/item">
				<tr>
					<td>
						<xsl:value-of select="title"/>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
</xsl:stylesheet>